using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PDFManipulation.Business.File;
using PDFManipulation.Entities;

namespace PDFManipulation.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PdfsController(IPdfFileService pdfFileService) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> UploadForm([FromForm] IFormFile file)
    {
        if (file == null)
        {
            return BadRequest("File is null");
        }

        if (file.Length == 0)
        {
            return BadRequest("File is empty");
        }

        using MemoryStream memoryStream = new();
        await file.CopyToAsync(memoryStream);
        PdfFile pdfFile = new()
        {
            FileName = file.FileName,
            FileData = Convert.ToBase64String(memoryStream.ToArray())
        };

        await pdfFileService.AddPdfFileAsync(pdfFile);
        return Ok();
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetPdfFileByIdAsync(int id)
    {
        PdfFile? pdfFile = await pdfFileService.GetPdfFileByIdAsync(id);
        if (pdfFile == null)
        {
            return NotFound();
        }

        try
        {
            byte[] fileData = Convert.FromBase64String(pdfFile.FileData);
            return File(fileData, "application/pdf", pdfFile.FileName);
        }
        catch (FormatException)
        {
            return BadRequest("Dosya verisi geçersiz.");
        }
    }



    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePdfFileAsync(int id)
    {
        await pdfFileService.DeletePdfFileAsync(id);
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetAllFileName()
    {
        var pdfsName = await pdfFileService.GetAllFileName();
        if (pdfsName == null)
        {
            return NotFound();
        }  
        return Ok(pdfsName);
    }
}
