import os, sys
from pptx import Presentation

sys.stdout.reconfigure(encoding='utf-8')

ppts_dir = r"E:\From Laptop\Arpan - Personal\2. Teaching\2026 - 2027\CE432P\Sessions\Unit II"
output_file = r"C:\Users\HP\.gemini\antigravity\scratch\hydraulics\extracted_unit2_5ppts.txt"

files = [
    "III_1 - Introduction.pptx",
    "III_2 - Conservation Laws and C.pptx",
    "III_3 - Economical Section.pptx",
    "III_4 - Specific Energy and Hyd. Jump.pptx",
    "III_5 - Hydraulic Jump.pptx"
]

with open(output_file, "w", encoding="utf-8") as out:
    for fname in files:
        fpath = os.path.join(ppts_dir, fname)
        out.write(f"\n{'='*80}\nFILE: {fname}\n{'='*80}\n")
        prs = Presentation(fpath)
        for idx, slide in enumerate(prs.slides, 1):
            out.write(f"\n--- Slide {idx} ---\n")
            title = ""
            if slide.shapes.title and slide.shapes.title.text:
                title = slide.shapes.title.text.strip()
                out.write(f"TITLE: {title}\n")
            
            for shape in slide.shapes:
                if shape.has_text_frame and shape != slide.shapes.title:
                    text = shape.text_frame.text.strip()
                    if text:
                        out.write(f"{text}\n")
                elif shape.has_table:
                    out.write("[TABLE]\n")
                    for row in shape.table.rows:
                        row_vals = [cell.text.strip().replace('\n', ' ') for cell in row.cells]
                        out.write(" | ".join(row_vals) + "\n")
            
            # Slide notes if any
            if slide.has_notes_slide and slide.notes_slide.notes_text_frame:
                notes = slide.notes_slide.notes_text_frame.text.strip()
                if notes:
                    out.write(f"NOTES: {notes}\n")

print(f"Extraction complete. Output written to {output_file}")
