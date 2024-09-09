using PDFManipulation.Entities;
using PDFManipulation.Entities.DTOs;

namespace PDFManipulation.Business.File;

public interface IPdfFileService
{
    Task<PdfFile> GetPdfFileByIdAsync(int id);
    Task<PdfFile> AddPdfFileAsync(PdfFile pdfFile);
    Task DeletePdfFileAsync(int id);
    Task<List<PdfFileNameDto>> GetAllFileName();
}
