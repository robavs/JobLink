using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class novamigracija1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdvertismentFreelancer");

            migrationBuilder.DropTable(
                name: "Advertisments");

            migrationBuilder.CreateTable(
                name: "Advertisements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployerUserName = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    EmployerEmail = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Skills = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Advertisements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Advertisements_Employers_EmployerUserName_EmployerEmail",
                        columns: x => new { x.EmployerUserName, x.EmployerEmail },
                        principalTable: "Employers",
                        principalColumns: new[] { "UserName", "Email" });
                });

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
                name: "IX_AdvertisementFreelancer_FreelancersUserName_FreelancersEmail",
                table: "AdvertisementFreelancer",
                columns: new[] { "FreelancersUserName", "FreelancersEmail" });

            migrationBuilder.CreateIndex(
                name: "IX_Advertisements_EmployerUserName_EmployerEmail",
                table: "Advertisements",
                columns: new[] { "EmployerUserName", "EmployerEmail" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdvertisementFreelancer");

            migrationBuilder.DropTable(
                name: "Advertisements");

            migrationBuilder.CreateTable(
                name: "Advertisments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployerUserName = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    EmployerEmail = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Skills = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Advertisments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Advertisments_Employers_EmployerUserName_EmployerEmail",
                        columns: x => new { x.EmployerUserName, x.EmployerEmail },
                        principalTable: "Employers",
                        principalColumns: new[] { "UserName", "Email" });
                });

            migrationBuilder.CreateTable(
                name: "AdvertismentFreelancer",
                columns: table => new
                {
                    AdvertismentsId = table.Column<int>(type: "int", nullable: false),
                    FreelancersUserName = table.Column<string>(type: "nvarchar(20)", nullable: false),
                    FreelancersEmail = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdvertismentFreelancer", x => new { x.AdvertismentsId, x.FreelancersUserName, x.FreelancersEmail });
                    table.ForeignKey(
                        name: "FK_AdvertismentFreelancer_Advertisments_AdvertismentsId",
                        column: x => x.AdvertismentsId,
                        principalTable: "Advertisments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AdvertismentFreelancer_Freelancers_FreelancersUserName_FreelancersEmail",
                        columns: x => new { x.FreelancersUserName, x.FreelancersEmail },
                        principalTable: "Freelancers",
                        principalColumns: new[] { "UserName", "Email" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdvertismentFreelancer_FreelancersUserName_FreelancersEmail",
                table: "AdvertismentFreelancer",
                columns: new[] { "FreelancersUserName", "FreelancersEmail" });

            migrationBuilder.CreateIndex(
                name: "IX_Advertisments_EmployerUserName_EmployerEmail",
                table: "Advertisments",
                columns: new[] { "EmployerUserName", "EmployerEmail" });
        }
    }
}
