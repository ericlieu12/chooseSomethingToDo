// <auto-generated />
using chooseSomethingToDo.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace chooseSomethingToDo.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20220307024708_initcreate")]
    partial class initcreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);
#pragma warning restore 612, 618
        }
    }
}
