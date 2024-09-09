using System.ComponentModel.DataAnnotations.Schema;

namespace PDFManipulation.Entities;

public class FileData
{
    public int Id { get; set; }
    public int PdfFileId { get; set; }
    public string Content { get; set; } = string.Empty;
    public string Quote { get; set; } = string.Empty;

    [NotMapped]
    public List<HighlightArea> HighlightAreas { get; set; }             
}
