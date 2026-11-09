import os, sys, zipfile, xml.etree.ElementTree as ET

sys.stdout.reconfigure(encoding='utf-8')

def extract_pptx(path):
    text_slides = []
    try:
        with zipfile.ZipFile(path) as z:
            s_files = [f for f in z.namelist() if f.startswith('ppt/slides/slide') and f.endswith('.xml')]
            s_files.sort(key=lambda x: int(''.join(filter(str.isdigit, x)) or 0))
            for sf in s_files:
                tree = ET.fromstring(z.read(sf))
                paras = []
                for p in tree.iter('{http://schemas.openxmlformats.org/drawingml/2006/main}p'):
                    t = ''.join([n.text for n in p.iter('{http://schemas.openxmlformats.org/drawingml/2006/main}t') if n.text])
                    if t.strip():
                        paras.append(t.strip())
                if paras:
                    text_slides.append(" \n ".join(paras))
    except Exception as e:
        text_slides.append(f"Error: {e}")
    return text_slides

ce432p_dir = r"E:\From Laptop\Arpan - Personal\2. Teaching\2026 - 2027\CE432P\Sessions"
ce332_dir = r"E:\From Laptop\Arpan - Personal\2. Teaching\2026 - 2027\CE332\Slide Deck"

out_path = r"C:\Users\HP\.gemini\antigravity\scratch\hydraulics\extracted_slides_summary.txt"

with open(out_path, "w", encoding="utf-8") as out:
    out.write("=====================================================\n")
    out.write("CE432P HYDRAULIC ENGINEERING SESSIONS\n")
    out.write("=====================================================\n\n")
    
    for root, dirs, files in os.walk(ce432p_dir):
        for f in sorted(files):
            if f.endswith(".pptx") and not f.startswith("~$"):
                fp = os.path.join(root, f)
                rel = os.path.relpath(fp, ce432p_dir)
                slides = extract_pptx(fp)
                out.write(f"\n\n### FILE: {rel} ({len(slides)} slides)\n")
                for idx, sl in enumerate(slides):
                    out.write(f"\n--- Slide {idx+1} ---\n{sl}\n")

    out.write("\n\n=====================================================\n")
    out.write("CE332 FLUID MECHANICS SLIDE DECK (FOUNDATIONS & BRIDGING)\n")
    out.write("=====================================================\n\n")
    
    for root, dirs, files in os.walk(ce332_dir):
        for f in sorted(files):
            if f.endswith(".pptx") and not f.startswith("~$"):
                fp = os.path.join(root, f)
                rel = os.path.relpath(fp, ce332_dir)
                slides = extract_pptx(fp)
                out.write(f"\n\n### FILE: {rel} ({len(slides)} slides)\n")
                for idx, sl in enumerate(slides):
                    out.write(f"\n--- Slide {idx+1} ---\n{sl}\n")

print(f"Extracted all slides successfully to {out_path}")
