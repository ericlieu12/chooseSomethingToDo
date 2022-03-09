using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace chooseSomethingToDo.Migrations
{
    public partial class fixedreference : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Lobbys_LobbyId",
                table: "Users");

            migrationBuilder.AlterColumn<int>(
                name: "LobbyId",
                table: "Users",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Lobbys_LobbyId",
                table: "Users",
                column: "LobbyId",
                principalTable: "Lobbys",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Lobbys_LobbyId",
                table: "Users");

            migrationBuilder.AlterColumn<int>(
                name: "LobbyId",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Lobbys_LobbyId",
                table: "Users",
                column: "LobbyId",
                principalTable: "Lobbys",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
