using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace chooseSomethingToDo.Migrations
{
    public partial class userremovedonevariable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "amountDone",
                table: "Users");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "amountDone",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
