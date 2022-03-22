package database

import (
	"github.com/creometry-incubator/colibris/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB = nil

func InitializeDB() {
	database, err := gorm.Open(sqlite.Open("data/test.db"), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	if err = database.AutoMigrate(&models.Rating{}); err != nil {
		panic(err)
	}
	DB = database
}
