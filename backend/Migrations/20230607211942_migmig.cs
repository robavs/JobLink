using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class migmig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FreelancerAdvertisement_Freelancers_UserName_Email",
                table: "FreelancerAdvertisement");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FreelancerAdvertisement",
                table: "FreelancerAdvertisement");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "FreelancerAdvertisement",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_FreelancerAdvertisement",
                table: "FreelancerAdvertisement",
                columns: new[] { "AdvertisementId", "UserName", "Email" });

            migrationBuilder.AddForeignKey(
                name: "FK_FreelancerAdvertisement_Freelancers_UserName_Email",
                table: "FreelancerAdvertisement",
                columns: new[] { "UserName", "Email" },
                principalTable: "Freelancers",
                principalColumns: new[] { "UserName", "Email" },
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FreelancerAdvertisement_Freelancers_UserName_Email",
                table: "FreelancerAdvertisement");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FreelancerAdvertisement",
                table: "FreelancerAdvertisement");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "FreelancerAdvertisement",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FreelancerAdvertisement",
                table: "FreelancerAdvertisement",
                columns: new[] { "AdvertisementId", "UserName" });

            migrationBuilder.AddForeignKey(
                name: "FK_FreelancerAdvertisement_Freelancers_UserName_Email",
                table: "FreelancerAdvertisement",
                columns: new[] { "UserName", "Email" },
                principalTable: "Freelancers",
                principalColumns: new[] { "UserName", "Email" });
        }
    }
}
