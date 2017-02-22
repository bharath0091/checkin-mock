let labels = require("../labels-service");

describe("labels", () => {
    it("english", function () {
        let product = labels("english");
        expect(product["booking.code"]).toBe("Booking code");
        expect(product["family.name"]).toBe("Family name");
        expect(product["flight.number"]).toBe("Flight number");
        expect(product["flight.date"]).toBe("Flight date");
    });
    it("dutch", function () {
        let product = labels("dutch");
        expect(product["booking.code"]).toBe("Boekingscode");
        expect(product["family.name"]).toBe("Achternaam");
        expect(product["flight.number"]).toBe("Flight nummer");
        expect(product["flight.date"]).toBe("Flight date");
    });
});