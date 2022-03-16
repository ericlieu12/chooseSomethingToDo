using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace chooseSomethingToDo.Migrations
{
    public partial class userdonevariable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDone",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDone",
                table: "Users");
        }
    }
}
