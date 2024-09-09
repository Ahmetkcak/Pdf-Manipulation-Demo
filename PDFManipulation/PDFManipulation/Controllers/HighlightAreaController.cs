using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PDFManipulation.Business.Highlight;
using PDFManipulation.Entities;

namespace PDFManipulation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HighlightAreaController(IHighlightAreaService highlightAreaService) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> AddHighlightAreas([FromBody] List<HighlightArea> highlightAreas)
        {
            if (highlightAreas == null || !highlightAreas.Any())
            {
                return BadRequest("No highlight areas provided.");
            }

            var addedHighlightAreas = await highlightAreaService.AddRangeHighlightAreaAsync(highlightAreas);
            return Ok(addedHighlightAreas);
        }

        [HttpGet("{fileDataId}")]
        public async Task<IActionResult> GetHighlightAreasByFileDataId(int fileDataId)
        {
            var highlightAreas = await highlightAreaService.GetFileDataByIdAsync(fileDataId);
            if (highlightAreas == null || !highlightAreas.Any())
            {
                return NotFound("No highlight areas found for the given file data ID.");
            }

            return Ok(highlightAreas);
        }
    }
}
