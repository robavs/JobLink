using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class migracijaNovaNova : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Advertisements_Employers_EmployerUserName1_EmployerEmail1",
                table: "Advertisements");

            migrationBuilder.DropForeignKey(
                name: "FK_Advertisements_Employers_EmployerUserName_EmployerEmail",
                table: "Advertisements");

            migrationBuilder.DropIndex(
                name: "IX_Advertisements_EmployerUserName_EmployerEmail",
                table: "Advertisements");

            migrationBuilder.DropIndex(
                name: "IX_Advertisements_EmployerUserName1_EmployerEmail1",
                table: "Advertisements");

            migrationBuilder.DropColumn(
                name: "EmployerEmail1",
                table: "Advertisements");

            migrationBuilder.DropColumn(
                name: "EmployerUserName1",
                table: "Advertisements");

            migrationBuilder.AlterColumn<string>(
                name: "EmployerUserName",
                table: "Advertisements",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "EmployerEmail",
                table: "Advertisements",
                type: "nvarchar(20)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Advertisements_EmployerEmail_EmployerUserName",
                table: "Advertisements",
                columns: new[] { "EmployerEmail", "EmployerUserName" });

            migrationBuilder.AddForeignKey(
                name: "FK_Advertisements_Employers_EmployerEmail_EmployerUserName",
                table: "Advertisements",
                columns: new[] { "EmployerEmail", "EmployerUserName" },
                principalTable: "Employers",
                principalColumns: new[] { "UserName", "Email" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Advertisements_Employers_EmployerEmail_EmployerUserName",
                table: "Advertisements");

            migrationBuilder.DropIndex(
                name: "IX_Advertisements_EmployerEmail_EmployerUserName",
                table: "Advertisements");

            migrationBuilder.AlterColumn<string>(
                name: "EmployerUserName",
                table: "Advertisements",
                type: "nvarchar(20)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "EmployerEmail",
                table: "Advertisements",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EmployerEmail1",
                table: "Advertisements",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EmployerUserName1",
                table: "Advertisements",
                type: "nvarchar(20)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Advertisements_EmployerUserName_EmployerEmail",
                table: "Advertisements",
                columns: new[] { "EmployerUserName", "EmployerEmail" });

            migrationBuilder.CreateIndex(
                name: "IX_Advertisements_EmployerUserName1_EmployerEmail1",
                table: "Advertisements",
                columns: new[] { "EmployerUserName1", "EmployerEmail1" });

            migrationBuilder.AddForeignKey(
                name: "FK_Advertisements_Employers_EmployerUserName1_EmployerEmail1",
                table: "Advertisements",
                columns: new[] { "EmployerUserName1", "EmployerEmail1" },
                principalTable: "Employers",
                principalColumns: new[] { "UserName", "Email" });

            migrationBuilder.AddForeignKey(
                name: "FK_Advertisements_Employers_EmployerUserName_EmployerEmail",
                table: "Advertisements",
                columns: new[] { "EmployerUserName", "EmployerEmail" },
                principalTable: "Employers",
                principalColumns: new[] { "UserName", "Email" });
        }
    }
}
