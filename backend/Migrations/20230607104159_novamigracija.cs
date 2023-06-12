using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class novamigracija : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AdvertismentFreelancer_Advertisments_OglasiId",
                table: "AdvertismentFreelancer");

            migrationBuilder.RenameColumn(
                name: "OglasiId",
                table: "AdvertismentFreelancer",
                newName: "AdvertismentsId");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Advertisments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Skills",
                table: "Advertisments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Advertisments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Category",
                table: "Advertisments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AdvertismentFreelancer_Advertisments_AdvertismentsId",
                table: "AdvertismentFreelancer",
                column: "AdvertismentsId",
                principalTable: "Advertisments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AdvertismentFreelancer_Advertisments_AdvertismentsId",
                table: "AdvertismentFreelancer");

            migrationBuilder.RenameColumn(
                name: "AdvertismentsId",
                table: "AdvertismentFreelancer",
                newName: "OglasiId");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Advertisments",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Skills",
                table: "Advertisments",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Advertisments",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Category",
                table: "Advertisments",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddForeignKey(
                name: "FK_AdvertismentFreelancer_Advertisments_OglasiId",
                table: "AdvertismentFreelancer",
                column: "OglasiId",
                principalTable: "Advertisments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
