using PDFManipulation.DataAccess;
using PDFManipulation.Entities;

namespace PDFManipulation.Business.Highlight;

public class HighlightAreaManager(ApplicationDbContext dbContext) : IHighlightAreaService
{
    public Task<List<HighlightArea>> AddRangeHighlightAreaAsync(List<HighlightArea> highlightAreas)
    {
        dbContext.HighlightAreas.AddRange(highlightAreas);
        dbContext.SaveChanges();
        return Task.FromResult(highlightAreas);
    }

    public Task<List<HighlightArea>> GetFileDataByIdAsync(int fileDataId)
    {
        List<HighlightArea> highlightAreas = dbContext.HighlightAreas.Where(h => h.FileDataId == fileDataId).ToList();
        return Task.FromResult(highlightAreas);
    }
}
