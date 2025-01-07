# frozen_string_literal: true

DeviseTokenAuth.setup do |config|
  config.token_lifespan = 1.week
  config.token_cost = Rails.env.test? ? 4 : 10
end
