import { Request, Response } from "express";
import axios from "axios";
import { BadRequestError } from "../errors/bad-request-error";
import { Workout } from "../entities/WorkoutEntity";

// local hash for location allready checked
const hashLocation: any = {};

const createWorkout = async (req: Request, res: Response) => {
  const {
    userId,
    type,
    location: { lat, lon },
    duration,
  } = req.body;
  // set startup value
  let pollutionLevel = hashLocation[lat + lon] || 1;
  if (!hashLocation[lat + lon]) {
    try {
      const { data } = await axios.get(
        `https://api.breezometer.com/air-quality/v2/current-conditions?lat=${lat.toString()}&lon=${lon.toString()}&key=${
          process.env.BREEZO_KEY
        }`
      );
      if (data?.data?.indexes?.baqi?.aqi) {
        pollutionLevel = data?.data?.indexes?.baqi?.aqi;
      }
      hashLocation[lat + lon] = pollutionLevel;
    } catch (err) {
      throw new Error(err);
    }
  }

  let workout = Workout.build({
    userId,
    type,
    location: { lat, lon },
    pollutionLevel,
    duration,
  });
  await workout.save();
  return res.status(201).send({ id: workout.id });
};
const updateWorkout = async (req: Request, res: Response) => {
  const {
    userId,
    workoutId,
    type,
    location: { lat, lon },
    duration,
    comments = "",
  } = req.body;

  const getWorkout = await Workout.findOne({ _id: workoutId });
  if (!getWorkout || getWorkout.userId != userId) {
    throw new BadRequestError("workout not found");
  }
  const getLocation = getWorkout?.location?.lat + getWorkout?.location.lon;
  const receiveLocation = lat + lon;

  if (getLocation !== receiveLocation) {
    try {
      const { data } = await axios.get(
        `https://api.breezometer.com/air-quality/v2/current-conditions?lat=${lat.toString()}&lon=${lon.toString()}&key=${
          process.env.BREEZO_KEY
        }`
      );
      // set startup value
      let pollutionLevel = 1;
      if (data?.data?.indexes?.baqi?.aqi) {
        pollutionLevel = data?.data?.indexes?.baqi?.aqi;
      }
      hashLocation[lat + lon] = pollutionLevel;
      await Workout.updateOne(
        { _id: getWorkout.id },
        {
          type,
          location: { lat, lon },
          pollutionLevel,
          duration,
          comments,
        }
      );
      return res.status(201).send({ id: getWorkout.id });
    } catch (err) {
      throw new Error(err);
    }
  } else {
    await Workout.updateOne(
      { _id: getWorkout.id },
      {
        type,
        location: { lat, lon },
        pollutionLevel: getWorkout.pollutionLevel,
        duration,
        comments,
      }
    );
    return res.status(201).send({ id: getWorkout.id });
  }
};
const deleteWorkout = async (req: Request, res: Response) => {
  const { workoutId, userId } = req.body;
  const checkUserWorkout = await Workout.findOne({ _id: workoutId });
  if (checkUserWorkout?.userId != userId) {
    throw new BadRequestError("Not Authorized");
  }
  await checkUserWorkout?.deleteOne();
  return res.status(200).send({ message: "Delete Task success" });
};

const getWorkout = async (req: Request, res: Response) => {
  const { userId, dateFilter, pollutionLevelFilter } = req.body;
  let userWorkouts;
  if (dateFilter && pollutionLevelFilter) {
    const { fromDate, toDate } = dateFilter;
    const { fromPollutionLevel, toPollutionLevel } = pollutionLevelFilter;
    userWorkouts = await Workout.find({
      userId,
      date: { $gte: fromDate, $lte: toDate },
      pollutionLevel: { $gte: fromPollutionLevel, $lte: toPollutionLevel },
    });
    return res.send(userWorkouts);
  } else if (pollutionLevelFilter) {
    const { fromPollutionLevel, toPollutionLevel } = pollutionLevelFilter;
    userWorkouts = await Workout.find({
      userId,
      pollutionLevel: { $gte: fromPollutionLevel, $lt: toPollutionLevel },
    });
    return res.send(userWorkouts);
  } else if (dateFilter) {
    const { fromDate, toDate } = dateFilter;
    userWorkouts = await Workout.find({
      userId,
      date: { $gte: fromDate, $lte: toDate },
    });
    return res.send(userWorkouts);
  }
  userWorkouts = await Workout.find({ userId });
  return res.send(userWorkouts);
};
export { createWorkout, updateWorkout, deleteWorkout, getWorkout };
