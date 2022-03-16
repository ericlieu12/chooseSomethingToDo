using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace chooseSomethingToDo.Migrations
{
    public partial class userDone : Migration
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
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ConnectionID",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "amountDone",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "usersDone",
                table: "Lobbys",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Lobbys_LobbyId",
                table: "Users",
                column: "LobbyId",
                principalTable: "Lobbys",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Lobbys_LobbyId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "amountDone",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "usersDone",
                table: "Lobbys");

            migrationBuilder.AlterColumn<int>(
                name: "LobbyId",
                table: "Users",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "ConnectionID",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Lobbys_LobbyId",
                table: "Users",
                column: "LobbyId",
                principalTable: "Lobbys",
                principalColumn: "Id");
        }
    }
}
