using PDFManipulation.Entities;

namespace PDFManipulation.Business.Highlight;

public interface IHighlightAreaService
{
    Task<List<HighlightArea>> GetFileDataByIdAsync(int fileDataId);
    Task<List<HighlightArea>> AddRangeHighlightAreaAsync(List<HighlightArea> highlightAreas);
}
