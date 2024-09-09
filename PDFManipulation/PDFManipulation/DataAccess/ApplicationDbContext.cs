using Microsoft.EntityFrameworkCore;
using PDFManipulation.Entities;

namespace PDFManipulation.DataAccess;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    : base(options)
    {
    }

    public DbSet<PdfFile> PdfFiles { get; set; }
    public DbSet<FileData> FileDatas { get; set; }
    public DbSet<HighlightArea> HighlightAreas { get; set; }
}
