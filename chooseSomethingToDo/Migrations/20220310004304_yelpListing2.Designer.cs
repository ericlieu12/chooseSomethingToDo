// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using chooseSomethingToDo.Database;

#nullable disable

namespace chooseSomethingToDo.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20220310004304_yelpListing2")]
    partial class yelpListing2
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("chooseSomethingToDo.DBModels.Lobby", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("UrlString")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("isStarted")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("Lobbys");
                });

            modelBuilder.Entity("chooseSomethingToDo.DBModels.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("IsLeader")
                        .HasColumnType("bit");

                    b.Property<int?>("LobbyId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("LobbyId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("chooseSomethingToDo.DBModels.YelpListing", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int?>("LobbyId")
                        .HasColumnType("int");

                    b.Property<string>("addressString")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("alias")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("categoryTitleString")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("city")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("country")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("distance")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("imageURL")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("phone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("price")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("rating")
                        .HasColumnType("int");

                    b.Property<int>("reviewCount")
                        .HasColumnType("int");

                    b.Property<string>("state")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("transactionsString")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("yelpID")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("yelpURL")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("zipCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("LobbyId");

                    b.ToTable("YelpListings");
                });

            modelBuilder.Entity("chooseSomethingToDo.DBModels.User", b =>
                {
                    b.HasOne("chooseSomethingToDo.DBModels.Lobby", null)
                        .WithMany("users")
                        .HasForeignKey("LobbyId");
                });

            modelBuilder.Entity("chooseSomethingToDo.DBModels.YelpListing", b =>
                {
                    b.HasOne("chooseSomethingToDo.DBModels.Lobby", null)
                        .WithMany("yelpListings")
                        .HasForeignKey("LobbyId");
                });

            modelBuilder.Entity("chooseSomethingToDo.DBModels.Lobby", b =>
                {
                    b.Navigation("users");

                    b.Navigation("yelpListings");
                });
#pragma warning restore 612, 618
        }
    }
}
