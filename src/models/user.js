const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 3,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    skills: {
      type: [String],
    },
    photoUrl: {
      type: String,
      default:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALEAAACUCAMAAADrljhyAAAASFBMVEX6+vqPj4////+KioqsrKyHh4eSkpL19fXy8vLq6uqEhITk5OS5ubnt7e3c3NzZ2dmkpKSdnZ3S0tKysrLLy8u/v7/FxcV9fX00jOP3AAADrklEQVR4nO2c6U7kMAyAUztX76THzPu/6aYzLLDMTtuU5qjkT4BA4seHZRIndssYQRAEQRAEQRAEQRBpAWBKt2VZtlotP2QOgOqmhhu5YPk8dXlLA5SNlegoFhAFSju32ToDq231dP0OVqZmWTpDx6sX3Q/nsc5PGdRcvMb3L0LecgsztOa97yPOXGelDB2uC7swFzllBnRiw3eJckbK0G37LsoyF2Wo5VZKfCjbMg9lbfcJu1w2qV0fwLgjiT+o5gyCvOu/7isxMsgLtTsnHsY2tS+DyUfYMaQOst7Y616CzFVaYejfVD9vEXViY88QO+MxbVoo3xC7vEgqDIO/cZV0rwbumxQuLZLuIiC9hYvCpjTWR4xlQmGoDwgXsk1o3B8xTlnZw3A9Y/+lwtGRsYfxvgPeT1JmxaG1oki4Vhxcj1PWm9fb847UFdgkNZ78a7d7wqXCoe/exlVK3yueQWDwua14GKdNCsZa6yeMRqcVZnDzCzImv6/wDbJJfF3BlgXOJ8jJs/ih7HHxJngGwo6VJtO/YNIN+gvodlYXKDO4i32wN5Wxz0R4b3lR5SP8OKJu5TLKHJaJL6DbWDGEyaU19hfQfK2Mu48qM2G2XLfIN61eRJtbgJ8Amwy+rhoCzZBb4/8T0MNYVN+lxV02fV5d/x8AU31jRVW5D/fFzp3KNr6fgEO1ZV22avk2tc5uruRKEJcBziCmryqnhv+OZmijrdTABo6VwN8hKuSRCmbQ4+Zw2z6wGGOEGUqvoZUNZxOh5tDW96ZtDRF+QASaM4Xd4e8WOsit/xX3hnLgIMN4XhI/CT28oI60atYJe08E9fnGYUcBDrbO142DnlphCBDjoDcvVzQ+XfiKxmHzeO9VsZdxQOELrm7HxhPWsWG3afBsOO4gcDMHmtPrisDFG3T+zf517m3gchPOrjaL0PXx9Sp6qM9N5BhDnB4PrGwj5vDC524iUZ50gvnE0/8U5Y7F7ymbVeFIT2bBWedpFLHGQ85aLyKOApxTJkdtVPs/HPQCirh9VKh3D668EY4+HQIt/8VOgpigsw5qKI46C9nH1n06l+N/XkywI8BVE7rCXHHmhed9vfv1MWVnHaBu/vcGiLe+ws6pRy2AlUsfZ4803nEcsnj9xjKhYFDgSn6giy7ynCYXAKCcRmPl81Um33pgwv0Z0ppmCW42uk8WIV33021uRs65McZ9HZv5NvS1zs72k2fvVimttHafSrHY7VyCIAiCIAiCIAiCIH7yByB2K9DaAOEIAAAAAElFTkSuQmCC",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
