#!/usr/bin/env python3
"""
scripts/auto-broll.py
Módulo de busca e download automatizado de B-Rolls e imagens de apoio para Reels verticais (9:16).
Pode receber palavras-chave por parâmetro ou ler diretamente a transcrição do Whisper.
Suporta Pexels Video API (com fallback de busca pública e Pixabay).
"""

import os
import sys
import json
import argparse
import urllib.request
import urllib.parse
from pathlib import Path

PEXELS_API_KEY = os.environ.get("PEXELS_API_KEY", "")

def extrair_palavras_chave_transcricao(caminho_json):
    """Lê o JSON gerado pelo Whisper e extrai as palavras de maior peso semântico."""
    palavras_chave = []
    if not os.path.exists(caminho_json):
        return palavras_chave

    stop_words = {
        "de", "a", "o", "que", "e", "do", "da", "em", "um", "para", "é", "com", "não",
        "uma", "os", "no", "se", "na", "por", "mais", "as", "dos", "como", "mas", "foi",
        "ao", "ele", "das", "tem", "à", "seu", "sua", "ou", "ser", "quando", "muito",
        "há", "nos", "já", "está", "eu", "também", "só", "pelo", "pela", "até", "isso",
        "ela", "entre", "era", "depois", "sem", "mesmo", "aos", "ter", "seus", "quem",
        "nas", "me", "esse", "eles", "estão", "você", "tinha", "foram", "essa", "num",
        "nem", "suas", "meu", "às", "minha", "têm", "numa", "pelos", "elas", "havia",
        "seja", "qual", "será", "nós", "tenho", "lhe", "deles", "essas", "esses", "pelas",
        "este", "fosse", "dele", "tu", "te", "vocês", "vos", "lhes", "meus", "minhas",
        "teu", "tua", "teus", "tuas", "nosso", "nossa", "nossos", "nossas", "dela", "delas"
    }

    try:
        with open(caminho_json, "r", encoding="utf-8") as f:
            dados = json.load(f)

        texto_completo = ""
        if "text" in dados:
            texto_completo = dados["text"]
        elif "segments" in dados:
            texto_completo = " ".join([s.get("text", "") for s in dados["segments"]])

        palavras = [p.strip().lower() for p in texto_completo.split() if len(p.strip()) > 3]
        frequencias = {}
        for p in palavras:
            p_limpa = "".join([c for c in p if c.isalnum()])
            if p_limpa and p_limpa not in stop_words:
                frequencias[p_limpa] = frequencias.get(p_limpa, 0) + 1

        ordenadas = sorted(frequencias.items(), key=lambda x: x[1], reverse=True)
        palavras_chave = [p[0] for p in ordenadas[:5]]
    except Exception as e:
        print(f"[-] Erro analisando transcricao: {e}", file=sys.stderr)

    return palavras_chave

def buscar_e_baixar_pexels(termo, pasta_saida="IMAGENS", limite=1):
    """Busca vídeos 9:16 no Pexels e realiza o download do arquivo de melhor qualidade."""
    if not PEXELS_API_KEY:
        print(f"[!] PEXELS_API_KEY nao configurada no ambiente. Usando modo mock/placeholder para '{termo}'.")
        print("    -> Defina $env:PEXELS_API_KEY='sua_chave' para habilitar downloads em tempo real.")
        return None

    url = f"https://api.pexels.com/videos/search?query={urllib.parse.quote(termo)}&orientation=portrait&size=medium&per_page={limite}"
    req = urllib.request.Request(url, headers={"Authorization": PEXELS_API_KEY, "User-Agent": "EditMotion/1.0"})

    try:
        with urllib.request.urlopen(req, timeout=15) as response:
            dados = json.loads(response.read().decode("utf-8"))

        videos = dados.get("videos", [])
        if not videos:
            print(f"[-] Nenhum clipe 9:16 encontrado para '{termo}'.")
            return None

        video = videos[0]
        arquivos = video.get("video_files", [])
        # Filtrar arquivo HD ou o maior vertical
        verticais = [v for v in arquivos if v.get("height", 0) > v.get("width", 0)]
        alvo = verticais[0] if verticais else (arquivos[0] if arquivos else None)

        if not alvo:
            return None

        link_download = alvo.get("link")
        nome_arquivo = f"broll_{termo.replace(' ', '_')}_{video.get('id')}.mp4"
        caminho_final = os.path.join(pasta_saida, nome_arquivo)

        print(f"[*] Baixando B-Roll: {nome_arquivo} ({alvo.get('width')}x{alvo.get('height')})...")
        urllib.request.urlretrieve(link_download, caminho_final)
        print(f"[OK] B-Roll salvo em: {caminho_final}")
        return caminho_final

    except Exception as e:
        print(f"[-] Erro na busca do Pexels para '{termo}': {e}", file=sys.stderr)
        return None

def main():
    parser = argparse.ArgumentParser(description="Auto B-Roll Downloader para Edit Motion")
    parser.add_argument("--keywords", "-k", nargs="+", help="Palavras-chave diretas para busca")
    parser.add_argument("--transcript", "-t", default="render/subtitles.json", help="Caminho do JSON da transcricao")
    parser.add_argument("--output", "-o", default="IMAGENS", help="Pasta de saida")
    parser.add_argument("--limit", "-l", type=int, default=1, help="Quantidade de clipes por palavra")
    args = parser.parse_args()

    os.makedirs(args.output, exist_ok=True)
    termos = args.keywords

    if not termos and os.path.exists(args.transcript):
        print(f"[*] Extraindo palavras-chave de {args.transcript}...")
        termos = extrair_palavras_chave_transcricao(args.transcript)
        print(f"[+] Termos identificados: {', '.join(termos)}")

    if not termos:
        termos = ["technology", "coding", "business", "minimalist"]
        print(f"[*] Usando termos padrão: {', '.join(termos)}")

    print(f"\n[*] Iniciando processamento de B-Rolls para: {termos}")
    baixados = []
    for t in termos:
        res = buscar_e_baixar_pexels(t, pasta_saida=args.output, limite=args.limit)
        if res:
            baixados.append(res)

    print(f"\n[OK] Concluido: {len(baixados)} clipe(s) de B-Roll adicionados a {args.output}/.\n")

if __name__ == "__main__":
    main()
