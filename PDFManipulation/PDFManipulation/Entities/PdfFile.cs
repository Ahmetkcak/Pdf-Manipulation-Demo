namespace PDFManipulation.Entities;

public class PdfFile
{
    public int Id { get; set; }
    public string FileName { get; set; } = string.Empty;
    public string FileData { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.Now;
}
