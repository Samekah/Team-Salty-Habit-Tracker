const Habit = require('./Habits');

class userHabits extends Habit {
  constructor(data) {
    super(data)((this.id = data.habit_id)),
      (this.habit_name = data.habit_name),
      (this.category_id = data.category_id),
      (this.startdate = data.start_date);
  }
}
