import os, sys, pypdf

sys.stdout.reconfigure(encoding='utf-8')

ce432p_dir = r"E:\From Laptop\Arpan - Personal\2. Teaching\2026 - 2027\CE432P\Sessions"
out_path = r"C:\Users\HP\.gemini\antigravity\scratch\hydraulics\extracted_pdfs_summary.txt"

pdf_files = [
    "Centrifugal Pump.pdf",
    "Turbines.pdf",
    "V-1 - Derivatives and Acceleration.pdf",
    "V-2 - Conservation Laws.pdf",
    "CFD Material.pdf",
    "Lab Schedule.pdf"
]

with open(out_path, "w", encoding="utf-8") as out:
    for pf in pdf_files:
        full_path = os.path.join(ce432p_dir, pf)
        if os.path.exists(full_path):
            out.write(f"\n\n=====================================================\n")
            out.write(f"PDF: {pf}\n")
            out.write(f"=====================================================\n")
            try:
                reader = pypdf.PdfReader(full_path)
                out.write(f"Total Pages: {len(reader.pages)}\n\n")
                for i, page in enumerate(reader.pages):
                    text = page.extract_text() or ""
                    out.write(f"--- Page {i+1} ---\n{text.strip()}\n\n")
            except Exception as e:
                out.write(f"Error reading PDF: {e}\n")

print(f"Extracted all PDFs to {out_path}")
