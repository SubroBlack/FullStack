describe("Blog App", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Test",
      username: "test",
      password: "test"
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login Form is not displayed by default", function() {
    cy.contains("Login Form");
  });

  describe("Login", function() {
    it("succeeds with right credentials", function() {
      cy.contains("Login Form").click();
      cy.get("#username").type("test");
      cy.get("#password").type("test");
      cy.get("#login").click();

      cy.contains("Test is logged in");
    });

    it("fails with wrong credentials", function() {
      cy.contains("Login Form").click();
      cy.get("#username").type("test");
      cy.get("#password").type("tsst");
      cy.get("#login").click();

      cy.contains("Wrong Credentials");
    });
  });

  describe("When Logged In: ", function() {
    beforeEach(function() {
      // Using the custom command
      cy.login({ username: "test", password: "test" });
    });

    it("Blog can be Created", function() {
      cy.contains("Add Blog Form").click();
      cy.get("#titleIn").type("Blog1");
      cy.get("#authorIn").type("Author1");
      cy.get("#urlIn").type("https://youtube.com");
      cy.get("#likesIn").type(10);
      cy.get("#addBlogBtn").click();

      cy.contains("Blog1 - Author1");
    });

    describe("After Blog is Created", function() {
      beforeEach(function() {
        cy.contains("Add Blog Form").click();
        cy.get("#titleIn").type("Blog1");
        cy.get("#authorIn").type("Author1");
        cy.get("#urlIn").type("https://youtube.com");
        cy.get("#likesIn").type(10);
        cy.get("#addBlogBtn").click();
      });

      it("Blog can be liked", function() {
        cy.contains("Blog1 - Author1").click();
        cy.contains("Add Like").click();
        cy.contains("11 likes");
      });

      it("Creator can delete the blog", function() {
        cy.contains("Blog1 - Author1").click();
        cy.contains("Delete").click();
        cy.get(".blogs").should("not", "contain", "Blog1 - Author1");
      });

      /*
      it("Other users cannot delete the blog", function() {
        // Blog is already created by Test user
        cy.contains("Logout").click();

        // Create another user
        const user = {
          name: "Test2",
          username: "test2",
          password: "test2"
        };
        cy.request("POST", "http://localhost:3001/api/users/", user);

        // Home Page
        cy.visit("http://localhost:3000");

        // Login
        cy.contains("Login Form").click();
        cy.get("#username").type("test2");
        cy.get("#password").type("test2");
        cy.get("#login").click();
        cy.contains("Test2 is logged in");

        // Try to delete the blog
        cy.contains("Blog1 - Author1").click();
        cy.contains("Delete").click();
        cy.get(".blogs").contains("Blog1 - Author1");
      });   */
    });
  });
});
