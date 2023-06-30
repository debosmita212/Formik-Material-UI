import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  TextField,
  TextareaAutosize,
  Select,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Button,
  InputLabel,
  FormHelperText,
  Box,
} from "@material-ui/core";
import "./Form.css";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  country: yup.string().required("Country is required"),
  gender: yup.string().required("Gender is required"),
  hobbies: yup.array().min(1, "Select atleast one hobby"),
});

const FormToRendered = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      country: "",
      gender: "",
      hobbies: [],
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      formik.setValues({
        name: "",
        address: "",
        country: "",
        gender: "",
        hobbies: [],
      });
    },
  });
  const handleHobbiesChange = (e) => {
    const { value, checked } = e.target;
    const { hobbies } = formik.values;

    if (checked) {
      formik.setFieldValue("hobbies", [...hobbies, value]);
    } else {
      const newHobbies = hobbies.filter((hobby) => hobby !== value);
      formik.setFieldValue("hobbies", newHobbies);
    }
  };
  return (
    <Box bgcolor="white" boxShadow={1} className="box-style">
      <form onSubmit={formik.handleSubmit} className="form-main">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && !!formik.errors.name}
              helperText={formik.touched.name && formik.errors.name}
              style={{ padding: "8px", width: "50%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address"
              name="address"
              label="Address"
              multiline
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && !!formik.errors.address}
              helperText={formik.touched.address && formik.errors.address}
              style={{ padding: "8px", width: "50%" }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl
              error={formik.touched.country && !!formik.errors.country}
              style={{ padding: "8px", width: "50%" }}
            >
              <FormLabel htmlFor="country" style={{ textAlign: "left" }}>
                Country
              </FormLabel>
              <Select
                id="country"
                name="country"
                value={formik.values.country || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.country && !!formik.errors.country}
                style={{ width: "50%" }}
              >
                <MenuItem value="">Select a country</MenuItem>
                <MenuItem value="IN">India</MenuItem>
                <MenuItem value="UK">United Kingdom</MenuItem>
                <MenuItem value="USA">United States</MenuItem>
              </Select>
              {formik.touched.country && formik.errors.country && (
                <FormHelperText>{formik.errors.country}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              component="fieldset"
              error={formik.touched.gender && !!formik.errors.gender}
              style={{ width: "50%" }}
            >
              <FormLabel component="legend" style={{ textAlign: "left" }}>
                Gender
              </FormLabel>
              <RadioGroup
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Others"
                />
              </RadioGroup>
              {formik.touched.gender && formik.errors.gender && (
                <Typography variant="caption" color="error">
                  {formik.errors.gender}
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl style={{ width: "50%" }}>
              <FormLabel component="legend" style={{ textAlign: "left" }}>
                Hobbies/Interests
              </FormLabel>
              <FormControlLabel
                control={
                  <Checkbox
                    name="sports"
                    value="sports"
                    checked={formik.values.hobbies.includes("sports")}
                    onChange={handleHobbiesChange}
                  />
                }
                label="Sports"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="music"
                    value="music"
                    checked={formik.values.hobbies.includes("music")}
                    onChange={handleHobbiesChange}
                  />
                }
                label="Music"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="dance"
                    value="dance"
                    checked={formik.values.hobbies.includes("dance")}
                    onChange={handleHobbiesChange}
                  />
                }
                label="Dance"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="reading"
                    value="reading"
                    checked={formik.values.hobbies.includes("reading")}
                    onChange={handleHobbiesChange}
                  />
                }
                label="Reading"
              />
            </FormControl>
            {formik.touched.hobbies && formik.errors.hobbies && (
              <Typography variant="caption" color="error">
                {formik.errors.hobbies}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginBottom: "12px" }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default FormToRendered;
