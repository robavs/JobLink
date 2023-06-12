using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class migmigmigmigmigmig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FreelancerAdvertisement_Advertisements_AdvertisementId",
                table: "FreelancerAdvertisement");

            migrationBuilder.DropForeignKey(
                name: "FK_FreelancerAdvertisement_Freelancers_UserName_Email",
                table: "FreelancerAdvertisement");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FreelancerAdvertisement",
                table: "FreelancerAdvertisement");

            migrationBuilder.RenameTable(
                name: "FreelancerAdvertisement",
                newName: "FreelancerAdvertisements");

            migrationBuilder.RenameIndex(
                name: "IX_FreelancerAdvertisement_AdvertisementId",
                table: "FreelancerAdvertisements",
                newName: "IX_FreelancerAdvertisements_AdvertisementId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FreelancerAdvertisements",
                table: "FreelancerAdvertisements",
                columns: new[] { "UserName", "Email", "AdvertisementId" });

            migrationBuilder.AddForeignKey(
                name: "FK_FreelancerAdvertisements_Advertisements_AdvertisementId",
                table: "FreelancerAdvertisements",
                column: "AdvertisementId",
                principalTable: "Advertisements",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FreelancerAdvertisements_Freelancers_UserName_Email",
                table: "FreelancerAdvertisements",
                columns: new[] { "UserName", "Email" },
                principalTable: "Freelancers",
                principalColumns: new[] { "UserName", "Email" },
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FreelancerAdvertisements_Advertisements_AdvertisementId",
                table: "FreelancerAdvertisements");

            migrationBuilder.DropForeignKey(
                name: "FK_FreelancerAdvertisements_Freelancers_UserName_Email",
                table: "FreelancerAdvertisements");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FreelancerAdvertisements",
                table: "FreelancerAdvertisements");

            migrationBuilder.RenameTable(
                name: "FreelancerAdvertisements",
                newName: "FreelancerAdvertisement");

            migrationBuilder.RenameIndex(
                name: "IX_FreelancerAdvertisements_AdvertisementId",
                table: "FreelancerAdvertisement",
                newName: "IX_FreelancerAdvertisement_AdvertisementId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FreelancerAdvertisement",
                table: "FreelancerAdvertisement",
                columns: new[] { "UserName", "Email", "AdvertisementId" });

            migrationBuilder.AddForeignKey(
                name: "FK_FreelancerAdvertisement_Advertisements_AdvertisementId",
                table: "FreelancerAdvertisement",
                column: "AdvertisementId",
                principalTable: "Advertisements",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FreelancerAdvertisement_Freelancers_UserName_Email",
                table: "FreelancerAdvertisement",
                columns: new[] { "UserName", "Email" },
                principalTable: "Freelancers",
                principalColumns: new[] { "UserName", "Email" },
                onDelete: ReferentialAction.Cascade);
        }
    }
}
