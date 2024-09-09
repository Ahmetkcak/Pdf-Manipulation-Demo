namespace PDFManipulation.Entities;

public class HighlightArea
{
    public int Id { get; set; }
    public int FileDataId { get; set; }
    public double Height { get; set; }
    public double Left { get; set; }
    public int PageIndex { get; set; }
    public double Top { get; set; }
    public double Width { get; set; }    
}
