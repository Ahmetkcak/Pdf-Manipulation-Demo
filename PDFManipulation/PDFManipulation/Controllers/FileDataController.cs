using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PDFManipulation.Business.Data;
using PDFManipulation.Entities;

namespace PDFManipulation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileDataController(IFileDataService fileDataService) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> AddFileData([FromBody] FileData fileData)
        {
            var addedFileData = await fileDataService.AddFileDataAsync(fileData);
            return Ok(addedFileData);
        }

        [HttpGet("{fileId}")]
        public async Task<IActionResult> GetFileDataByFileId(int fileId)
        {
            var fileDataList = await fileDataService.GetFileDataByFileIdAsync(fileId);
            return Ok(fileDataList);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFileData(int id)
        {
            var fileData = await fileDataService.GetFileDataByFileIdAsync(id);
            if (fileData == null)
            {
                return NotFound("File data not found.");
            }

            await fileDataService.DeleteFileDataAsync(id);
            return NoContent();
        }
    }
}
