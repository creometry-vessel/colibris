package controllers

import (
	"github.com/creometry-incubator/colibris/models"
	"github.com/creometry-incubator/colibris/services"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
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
	// check if id is a valid uuid
	if _, err := uuid.Parse(id); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "id must be a valid uuid",
		})
	}
	Rating, err := ratingsService.GetRating(id)
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
	// check if id is a valid uuid
	if _, err := uuid.Parse(id); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "user_id must be a valid uuid",
		})
	}
	Rating, err := ratingsService.GetRatingByUserId(id)
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
	if rating.PickupRequestID == "" || rating.UserId == "" || rating.Quality == 0 || rating.Quantity == 0 || rating.Treatment == 0 {
		return c.Status(500).JSON(fiber.Map{
			"error": "all fields must be filled",
		})
	}

	// check if user_id is a valid uuid
	if _, err := uuid.Parse(rating.UserId); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "user_id must be a valid uuid",
		})
	}

	// check if pickup_request_id is a valid uuid
	if _, err := uuid.Parse(rating.PickupRequestID); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "pickup_request_id must be a valid uuid",
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
	if rating.UUID == "" || rating.PickupRequestID == "" || rating.UserId == "" || rating.Quality == 0 || rating.Quantity == 0 || rating.Treatment == 0 {
		return c.Status(500).JSON(fiber.Map{
			"error": "all fields must be filled",
		})
	}
	// check if id is a valid uuid
	if _, err := uuid.Parse(rating.UUID); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "id must be a valid uuid",
		})
	}
	// check if user_id is a valid uuid
	if _, err := uuid.Parse(rating.UserId); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "user_id must be a valid uuid",
		})
	}

	// check if pickup_request_id is a valid uuid
	if _, err := uuid.Parse(rating.PickupRequestID); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "pickup_request_id must be a valid uuid",
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
	// check if id is a valid uuid
	if _, err := uuid.Parse(id); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "id must be a valid uuid",
		})
	}
	if err := ratingsService.DeleteRating(id); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.Status(204).JSON(fiber.Map{
		"data": "Rating deleted",
	})
}
