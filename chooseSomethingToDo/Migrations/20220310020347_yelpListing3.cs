using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace chooseSomethingToDo.Migrations
{
    public partial class yelpListing3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "YelpListingId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_YelpListingId",
                table: "Users",
                column: "YelpListingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_YelpListings_YelpListingId",
                table: "Users",
                column: "YelpListingId",
                principalTable: "YelpListings",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_YelpListings_YelpListingId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_YelpListingId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "YelpListingId",
                table: "Users");
        }
    }
}
