using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PDFManipulation.Migrations
{
    /// <inheritdoc />
    public partial class mic2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PropertyId",
                table: "FileDatas");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PropertyId",
                table: "FileDatas",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
