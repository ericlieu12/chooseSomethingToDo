using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace chooseSomethingToDo.Migrations
{
    public partial class yelpListing : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "YelpListings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    rating = table.Column<int>(type: "int", nullable: false),
                    price = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    yelpID = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    alias = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    categoryTitleString = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    reviewCount = table.Column<int>(type: "int", nullable: false),
                    yelpURL = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    imageURL = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    addressString = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    state = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    city = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    zipCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    distance = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    transactionsString = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LobbyId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_YelpListings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_YelpListings_Lobbys_LobbyId",
                        column: x => x.LobbyId,
                        principalTable: "Lobbys",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_YelpListings_LobbyId",
                table: "YelpListings",
                column: "LobbyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "YelpListings");
        }
    }
}
