using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class migrationFinal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AdvertismentFreelancer_Freelancers_FreelancersUserName_FreelancersEmail_FreelancersIdNumber",
                table: "AdvertismentFreelancer");

            migrationBuilder.DropForeignKey(
                name: "FK_Advertisments_Employers_EmployerUserName_EmployerEmail_EmployerIdNumber",
                table: "Advertisments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Freelancers",
                table: "Freelancers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Employers",
                table: "Employers");

            migrationBuilder.DropIndex(
                name: "IX_Advertisments_EmployerUserName_EmployerEmail_EmployerIdNumber",
                table: "Advertisments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AdvertismentFreelancer",
                table: "AdvertismentFreelancer");

            migrationBuilder.DropIndex(
                name: "IX_AdvertismentFreelancer_FreelancersUserName_FreelancersEmail_FreelancersIdNumber",
                table: "AdvertismentFreelancer");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Administrators",
                table: "Administrators");

            migrationBuilder.DropColumn(
                name: "EmployerIdNumber",
                table: "Advertisments");

            migrationBuilder.DropColumn(
                name: "FreelancersIdNumber",
                table: "AdvertismentFreelancer");

            migrationBuilder.AlterColumn<string>(
                name: "IdNumber",
                table: "Freelancers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "IdNumber",
                table: "Employers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "IdNumber",
                table: "Administrators",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Freelancers",
                table: "Freelancers",
                columns: new[] { "UserName", "Email" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Employers",
                table: "Employers",
                columns: new[] { "UserName", "Email" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_AdvertismentFreelancer",
                table: "AdvertismentFreelancer",
                columns: new[] { "AdvertismentsId", "FreelancersUserName", "FreelancersEmail" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Administrators",
                table: "Administrators",
                columns: new[] { "UserName", "Email" });

            migrationBuilder.CreateIndex(
                name: "IX_Advertisments_EmployerUserName_EmployerEmail",
                table: "Advertisments",
                columns: new[] { "EmployerUserName", "EmployerEmail" });

            migrationBuilder.CreateIndex(
                name: "IX_AdvertismentFreelancer_FreelancersUserName_FreelancersEmail",
                table: "AdvertismentFreelancer",
                columns: new[] { "FreelancersUserName", "FreelancersEmail" });

            migrationBuilder.AddForeignKey(
                name: "FK_AdvertismentFreelancer_Freelancers_FreelancersUserName_FreelancersEmail",
                table: "AdvertismentFreelancer",
                columns: new[] { "FreelancersUserName", "FreelancersEmail" },
                principalTable: "Freelancers",
                principalColumns: new[] { "UserName", "Email" },
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Advertisments_Employers_EmployerUserName_EmployerEmail",
                table: "Advertisments",
                columns: new[] { "EmployerUserName", "EmployerEmail" },
                principalTable: "Employers",
                principalColumns: new[] { "UserName", "Email" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AdvertismentFreelancer_Freelancers_FreelancersUserName_FreelancersEmail",
                table: "AdvertismentFreelancer");

            migrationBuilder.DropForeignKey(
                name: "FK_Advertisments_Employers_EmployerUserName_EmployerEmail",
                table: "Advertisments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Freelancers",
                table: "Freelancers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Employers",
                table: "Employers");

            migrationBuilder.DropIndex(
                name: "IX_Advertisments_EmployerUserName_EmployerEmail",
                table: "Advertisments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AdvertismentFreelancer",
                table: "AdvertismentFreelancer");

            migrationBuilder.DropIndex(
                name: "IX_AdvertismentFreelancer_FreelancersUserName_FreelancersEmail",
                table: "AdvertismentFreelancer");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Administrators",
                table: "Administrators");

            migrationBuilder.AlterColumn<string>(
                name: "IdNumber",
                table: "Freelancers",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "IdNumber",
                table: "Employers",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EmployerIdNumber",
                table: "Advertisments",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FreelancersIdNumber",
                table: "AdvertismentFreelancer",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "IdNumber",
                table: "Administrators",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Freelancers",
                table: "Freelancers",
                columns: new[] { "UserName", "Email", "IdNumber" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Employers",
                table: "Employers",
                columns: new[] { "UserName", "Email", "IdNumber" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_AdvertismentFreelancer",
                table: "AdvertismentFreelancer",
                columns: new[] { "AdvertismentsId", "FreelancersUserName", "FreelancersEmail", "FreelancersIdNumber" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Administrators",
                table: "Administrators",
                columns: new[] { "UserName", "Email", "IdNumber" });

            migrationBuilder.CreateIndex(
                name: "IX_Advertisments_EmployerUserName_EmployerEmail_EmployerIdNumber",
                table: "Advertisments",
                columns: new[] { "EmployerUserName", "EmployerEmail", "EmployerIdNumber" });

            migrationBuilder.CreateIndex(
                name: "IX_AdvertismentFreelancer_FreelancersUserName_FreelancersEmail_FreelancersIdNumber",
                table: "AdvertismentFreelancer",
                columns: new[] { "FreelancersUserName", "FreelancersEmail", "FreelancersIdNumber" });

            migrationBuilder.AddForeignKey(
                name: "FK_AdvertismentFreelancer_Freelancers_FreelancersUserName_FreelancersEmail_FreelancersIdNumber",
                table: "AdvertismentFreelancer",
                columns: new[] { "FreelancersUserName", "FreelancersEmail", "FreelancersIdNumber" },
                principalTable: "Freelancers",
                principalColumns: new[] { "UserName", "Email", "IdNumber" },
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Advertisments_Employers_EmployerUserName_EmployerEmail_EmployerIdNumber",
                table: "Advertisments",
                columns: new[] { "EmployerUserName", "EmployerEmail", "EmployerIdNumber" },
                principalTable: "Employers",
                principalColumns: new[] { "UserName", "Email", "IdNumber" });
        }
    }
}
