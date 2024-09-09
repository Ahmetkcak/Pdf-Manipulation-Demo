using Microsoft.EntityFrameworkCore;
using PDFManipulation.DataAccess;
using PDFManipulation.Entities;
using PDFManipulation.Entities.DTOs;
using System.Text;

namespace PDFManipulation.Business.File;
public class PdfFileManager(ApplicationDbContext dbContext) : IPdfFileService
{
    public Task<PdfFile> AddPdfFileAsync(PdfFile pdfFile)
    {
        dbContext.PdfFiles.Add(pdfFile);
        dbContext.SaveChanges();
        return Task.FromResult(pdfFile);
    }

    public Task DeletePdfFileAsync(int id)
    {
        PdfFile? deleteFile = dbContext.PdfFiles.Find(id);
        if (deleteFile != null)
        {
            dbContext.PdfFiles.Remove(deleteFile);
            dbContext.SaveChanges();
        }
        return Task.CompletedTask;
    }

    public Task<List<PdfFileNameDto>> GetAllFileName()
    {
        var fileNames = dbContext.PdfFiles
                .Select(f => new PdfFileNameDto { Id = f.Id, FileName = f.FileName })
                .ToList();
        return Task.FromResult(fileNames);
    }

    public Task<PdfFile> GetPdfFileByIdAsync(int id)
    {
        PdfFile? pdfFile = dbContext.PdfFiles.Find(id);
        return Task.FromResult(pdfFile);
    }
}
