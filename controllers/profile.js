const Profile = require("../models/Profile");
const { getUserById } = require("../helpers");

exports.getProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find().lean();
    const profileList = await Promise.all(
      profiles.map(async (profile) => ({
        ...profile,
        owner: await getUserById(profile.owner),
      }))
    );
    return res.status(200).json(profileList);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.createProfile = async (req, res, next) => {
  const { displayName, profession, country } = req.body;
  try {
    const profile = await Profile.findOne({ owner: req.user }).lean();
    if (profile) return res.status(400).send("Profile already exist..");
    const newProfile = await new Profile({
      displayName,
      profession,
      country,
      owner: req.user,
    }).save();
    newProfile.owner = await getUserById(newProfile.owner);
    return res.status(201).json(newProfile);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getUserProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ owner: req.user }).lean();
    if (!profile) return res.status(404).send("User profile not found..");
    profile.owner = await getUserById(profile.owner);
    return res.status(200).json({ ...profile, owner: profile.owner._doc });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  const { profile_id } = req.params;
  try {
    if (req.user) {
      const profile = await Profile.findOne()
        .and([{ _id: profile_id }, { owner: req.user }])
        .lean();
      if (!profile) return res.status(400).send("Profile not found..");
      if (profile.owner.toString() !== req.user._id.toString())
        return res.status(400).send("Permission denied..");
      const newProfile = await Profile.findByIdAndUpdate(
        { _id: profile_id },
        {
          ...req.body,
          owner: req.user,
        },
        { new: true }
      );
      newProfile.owner = await getUserById(newProfile.owner);
      return res.status(200).json(newProfile);
    }
    const profile = await Profile.findOne({ _id: profile_id }).lean();
    if (!profile) return res.status(400).send("Profile not found..");
    const newProfile = await Profile.findByIdAndUpdate(
      { _id: profile_id },
      {
        ...req.body,
      },
      { new: true }
    );
    newProfile.owner = await getUserById(newProfile.owner);
    return res.status(200).json(newProfile);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};
