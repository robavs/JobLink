using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class migmigmigmigmig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_FreelancerAdvertisement",
                table: "FreelancerAdvertisement");

            migrationBuilder.DropIndex(
                name: "IX_FreelancerAdvertisement_UserName_Email",
                table: "FreelancerAdvertisement");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FreelancerAdvertisement",
                table: "FreelancerAdvertisement",
                columns: new[] { "UserName", "Email", "AdvertisementId" });

            migrationBuilder.CreateIndex(
                name: "IX_FreelancerAdvertisement_AdvertisementId",
                table: "FreelancerAdvertisement",
                column: "AdvertisementId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_FreelancerAdvertisement",
                table: "FreelancerAdvertisement");

            migrationBuilder.DropIndex(
                name: "IX_FreelancerAdvertisement_AdvertisementId",
                table: "FreelancerAdvertisement");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FreelancerAdvertisement",
                table: "FreelancerAdvertisement",
                columns: new[] { "AdvertisementId", "UserName", "Email" });

            migrationBuilder.CreateIndex(
                name: "IX_FreelancerAdvertisement_UserName_Email",
                table: "FreelancerAdvertisement",
                columns: new[] { "UserName", "Email" });
        }
    }
}
