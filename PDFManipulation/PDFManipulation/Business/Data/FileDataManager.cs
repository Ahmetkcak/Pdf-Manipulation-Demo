using PDFManipulation.Business.Highlight;
using PDFManipulation.DataAccess;
using PDFManipulation.Entities;

namespace PDFManipulation.Business.Data;

public class FileDataManager(ApplicationDbContext dbContext,IHighlightAreaService highlightAreaService) : IFileDataService
{
    public Task<FileData> AddFileDataAsync(FileData fileData)
    {
        var returnData = dbContext.FileDatas.Add(fileData);
        dbContext.SaveChanges();
        return Task.FromResult(returnData.Entity);
    }

    public Task DeleteFileDataAsync(int id)
    {
        dbContext.FileDatas.Remove(dbContext.FileDatas.Find(id));
        dbContext.SaveChanges();
        return Task.CompletedTask;
    }

    public async Task<List<FileData>> GetFileDataByFileIdAsync(int fileId)
    {
        List<FileData> fileData = dbContext.FileDatas.Where(f => f.PdfFileId == fileId).ToList();

        foreach (var data in fileData)
        {
            List<HighlightArea> areas = await highlightAreaService.GetFileDataByIdAsync(data.Id);
            data.HighlightAreas = areas;
        }
        return fileData;
    }
}
