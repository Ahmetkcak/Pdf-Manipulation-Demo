using PDFManipulation.Entities;


namespace PDFManipulation.Business.Data;

public interface IFileDataService
{
    Task<List<FileData>> GetFileDataByFileIdAsync(int fileId);
    Task<FileData> AddFileDataAsync(FileData fileData);
    Task DeleteFileDataAsync(int id);
}
