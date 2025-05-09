# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_04_15_073508) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "informations", force: :cascade do |t|
    t.string "title"
    t.text "content"
    t.string "target_audience"
    t.datetime "end_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "leagues", force: :cascade do |t|
    t.string "category", null: false
    t.integer "division", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "match_reports", force: :cascade do |t|
    t.bigint "match_id", null: false
    t.bigint "reporting_team_id", null: false
    t.bigint "opponent_team_id", null: false
    t.integer "reporting_team_score", null: false
    t.integer "opponent_team_score", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["match_id"], name: "index_match_reports_on_match_id"
    t.index ["opponent_team_id"], name: "index_match_reports_on_opponent_team_id"
    t.index ["reporting_team_id"], name: "index_match_reports_on_reporting_team_id"
  end

  create_table "match_requests", force: :cascade do |t|
    t.bigint "team_id", null: false
    t.date "requested_date", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "double_header", default: false, null: false
    t.index ["team_id"], name: "index_match_requests_on_team_id"
  end

  create_table "matches", force: :cascade do |t|
    t.bigint "league_id", null: false
    t.datetime "date", null: false
    t.bigint "team1_id", null: false
    t.bigint "team2_id", null: false
    t.integer "team1_score"
    t.integer "team2_score"
    t.string "result"
    t.string "place", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["league_id"], name: "index_matches_on_league_id"
    t.index ["team1_id"], name: "index_matches_on_team1_id"
    t.index ["team2_id"], name: "index_matches_on_team2_id"
  end

  create_table "team_informations", force: :cascade do |t|
    t.bigint "team_id", null: false
    t.bigint "information_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["information_id"], name: "index_team_informations_on_information_id"
    t.index ["team_id"], name: "index_team_informations_on_team_id"
  end

  create_table "teams", force: :cascade do |t|
    t.string "leader_name", null: false
    t.string "team_name", null: false
    t.string "common_name", null: false
    t.string "email", default: "", null: false
    t.string "password_digest", default: "", null: false
    t.bigint "league_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "line_user_id"
    t.index ["email"], name: "index_teams_on_email", unique: true
    t.index ["league_id"], name: "index_teams_on_league_id"
    t.index ["team_name"], name: "index_teams_on_team_name", unique: true
  end

  add_foreign_key "match_reports", "matches"
  add_foreign_key "match_reports", "teams", column: "opponent_team_id"
  add_foreign_key "match_reports", "teams", column: "reporting_team_id"
  add_foreign_key "match_requests", "teams"
  add_foreign_key "matches", "leagues"
  add_foreign_key "matches", "teams", column: "team1_id"
  add_foreign_key "matches", "teams", column: "team2_id"
  add_foreign_key "team_informations", "informations"
  add_foreign_key "team_informations", "teams"
  add_foreign_key "teams", "leagues"
end
