using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class novamigracija23 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Advertisements_Employers_EmployerUserName_EmployerEmail",
                table: "Advertisements");

            migrationBuilder.DropTable(
                name: "AdvertisementFreelancer");

            migrationBuilder.DropIndex(
                name: "IX_Advertisements_EmployerUserName_EmployerEmail",
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

            migrationBuilder.CreateTable(
                name: "FreelancerAdvertisement",
                columns: table => new
                {
                    UserName = table.Column<string>(type: "nvarchar(20)", nullable: false),
                    AdvertisementId = table.Column<int>(type: "int", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Application = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FreelancerAdvertisement", x => new { x.AdvertisementId, x.UserName });
                    table.ForeignKey(
                        name: "FK_FreelancerAdvertisement_Advertisements_AdvertisementId",
                        column: x => x.AdvertisementId,
                        principalTable: "Advertisements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FreelancerAdvertisement_Freelancers_UserName_Email",
                        columns: x => new { x.UserName, x.Email },
                        principalTable: "Freelancers",
                        principalColumns: new[] { "UserName", "Email" });
                });

            migrationBuilder.CreateIndex(
                name: "IX_Advertisements_EmployerEmail_EmployerUserName",
                table: "Advertisements",
                columns: new[] { "EmployerEmail", "EmployerUserName" });

            migrationBuilder.CreateIndex(
                name: "IX_FreelancerAdvertisement_UserName_Email",
                table: "FreelancerAdvertisement",
                columns: new[] { "UserName", "Email" });

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

            migrationBuilder.DropTable(
                name: "FreelancerAdvertisement");

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

            migrationBuilder.CreateTable(
                name: "AdvertisementFreelancer",
                columns: table => new
                {
                    AdvertisementsId = table.Column<int>(type: "int", nullable: false),
                    FreelancersUserName = table.Column<string>(type: "nvarchar(20)", nullable: false),
                    FreelancersEmail = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdvertisementFreelancer", x => new { x.AdvertisementsId, x.FreelancersUserName, x.FreelancersEmail });
                    table.ForeignKey(
                        name: "FK_AdvertisementFreelancer_Advertisements_AdvertisementsId",
                        column: x => x.AdvertisementsId,
                        principalTable: "Advertisements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AdvertisementFreelancer_Freelancers_FreelancersUserName_FreelancersEmail",
                        columns: x => new { x.FreelancersUserName, x.FreelancersEmail },
                        principalTable: "Freelancers",
                        principalColumns: new[] { "UserName", "Email" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Advertisements_EmployerUserName_EmployerEmail",
                table: "Advertisements",
                columns: new[] { "EmployerUserName", "EmployerEmail" });

            migrationBuilder.CreateIndex(
                name: "IX_AdvertisementFreelancer_FreelancersUserName_FreelancersEmail",
                table: "AdvertisementFreelancer",
                columns: new[] { "FreelancersUserName", "FreelancersEmail" });

            migrationBuilder.AddForeignKey(
                name: "FK_Advertisements_Employers_EmployerUserName_EmployerEmail",
                table: "Advertisements",
                columns: new[] { "EmployerUserName", "EmployerEmail" },
                principalTable: "Employers",
                principalColumns: new[] { "UserName", "Email" });
        }
    }
}
