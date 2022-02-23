package controllers

import (
	"strconv"

	"github.com/creometry-incubator/colibris/models"
	"github.com/creometry-incubator/colibris/services"
	"github.com/gofiber/fiber/v2"
)


var ratingsService = services.CreateRatingsService()


func GetRatings(c *fiber.Ctx) error {
	Ratings, err := ratingsService.GetRatings()
	if err != nil {
		return c.Status(500).JSON(err)
	}
	return c.JSON(fiber.Map{
		"data": Ratings,
	})
}

func GetRatingById(c *fiber.Ctx) error {
	id := c.Params("id")
	// convert id to int
	idInt, err := strconv.Atoi(id)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "id must be an integer",
		})
	}
	Rating, err := ratingsService.GetRating(idInt)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.JSON(fiber.Map{
		"data": Rating,
	})
}

func GetRatingByUserId(c *fiber.Ctx) error {
	id := c.Params("user_id")
	// convert id to int
	idInt, err := strconv.Atoi(id)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "id must be an integer",
		})
	}
	Rating, err := ratingsService.GetRatingByUserId(idInt)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.JSON(fiber.Map{
		"data": Rating,
	})
}

func CreateRating(c *fiber.Ctx) error {
	rating := new(models.Rating)
	if err := c.BodyParser(rating); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	if rating.PickupRequestID == 0 || rating.UserId == 0 || rating.Quality == 0 || rating.Quantity == 0 || rating.Treatment == 0 {
		return c.Status(500).JSON(fiber.Map{
			"error": "all fields must be filled",
		})
	}
	if err := ratingsService.CreateRating(rating); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.Status(201).JSON(fiber.Map{
		"data": rating,
	})
}

func UpdateRating(c *fiber.Ctx) error {
	rating := new(models.Rating)
	if err := c.BodyParser(rating); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	if rating.ID == 0 || rating.PickupRequestID == 0 || rating.UserId == 0 || rating.Quality == 0 || rating.Quantity == 0 || rating.Treatment == 0 {
		return c.Status(500).JSON(fiber.Map{
			"error": "all fields must be filled",
		})
	}
	if err := ratingsService.UpdateRating(rating); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.JSON(fiber.Map{
		"data": rating,
	})
}

func DeleteRating(c *fiber.Ctx) error {
	id := c.Params("id")
	// convert id to int
	idInt, err := strconv.Atoi(id)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "id must be an integer",
		})
	}
	if err := ratingsService.DeleteRating(idInt); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.Status(204).JSON(fiber.Map{
		"data": "Rating deleted",
	})
}