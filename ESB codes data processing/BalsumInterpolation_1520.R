setwd("D:/Interpolate_tree_sp")
getwd()


library(terra)
library(sf)
library(dplyr)

# ---- Step 1: call the host tree species raster file from SCANFI 2015,2020 ----
# Read: BalsamFir from SCANFI_timeseries_v1_1 (withour extra species)
zipfile2015 <-"G:/.shortcut-targets-by-id/1-De3-ewe0hYpkVQHzeNI-wPJYVfZRxsG/SCANFI_timeseries_v1_1/output_map_summerOnly_k3_2015.zip"
balsam2015 <- "SCANFI_sps_balsamFir_S_2015_v1_1.tif" #BalsamFir


zipfile2020 <-"G:/.shortcut-targets-by-id/1-De3-ewe0hYpkVQHzeNI-wPJYVfZRxsG/SCANFI_timeseries_v1_1/output_map_summerOnly_k3_2020.zip"
balsam2020 <- "SCANFI_sps_balsamFir_S_2020_v1_1.tif" #BalsamFir

# Read a GeoTIFF directly from a zip 
r_balsam_2015 <- rast(paste0("/vsizip/", zipfile2015, "/", balsam2015))
r_balsam_2020 <- rast(paste0("/vsizip/", zipfile2020, "/", balsam2020))

# ---- Step 2: call the crown closure raster files from SCANFI 2015,2020 ----
zipfile2015 <-"G:/.shortcut-targets-by-id/1-De3-ewe0hYpkVQHzeNI-wPJYVfZRxsG/SCANFI_timeseries_v1_1/output_map_summerOnly_k3_2015.zip"
crown_closure2015 <- "SCANFI_att_closure_S_2015_v1_1.tif" #crown closure 2015

zipfile2020 <-"G:/.shortcut-targets-by-id/1-De3-ewe0hYpkVQHzeNI-wPJYVfZRxsG/SCANFI_timeseries_v1_1/output_map_summerOnly_k3_2020.zip"
crown_closure2020 <- "SCANFI_att_closure_S_2020_v1_1.tif" #crown closure 2020

# Read a GeoTIFF directly from a zip 
r_crownclosure_2015 <- rast(paste0("/vsizip/", zipfile2015, "/", crown_closure2015))
r_crownclosure_2020 <- rast(paste0("/vsizip/", zipfile2020, "/", crown_closure2020))

# ---- Step 3: Apply Québec 1-km template (project to it, then multiply) ----
qc_template <- rast("D:/QC_Template/QC_TEMPLATE_1KM/qc_template_1km_1_NA.tif")

# If these are continuous proportions/densities → bilinear
balsam2015_1km <- project(r_balsam_2015, qc_template, method = "bilinear")
balsam2020_1km <- project(r_balsam_2020, qc_template, method = "bilinear")

balsam2015_qc <- balsam2015_1km * qc_template
balsam2020_qc <- balsam2020_1km * qc_template

crownclosure2015_1km <- project(r_crownclosure_2015, qc_template, method = "bilinear")
crownclosure2020_1km <- project(r_crownclosure_2020, qc_template, method = "bilinear")

crownclosure2015_qc <- crownclosure2015_1km * qc_template
crownclosure2020_qc <- crownclosure2020_1km * qc_template

# Québec-only values (NA removed)
qc_ids <- which(!is.na(values(qc_template, mat = FALSE)))

vals_balsam2015 <- values(balsam2015_qc, mat = FALSE)[qc_ids] #ncell=1,512,617
vals_balsam2020 <- values(balsam2020_qc, mat = FALSE)[qc_ids] #ncell=1,512,617

vals_crownclosure2015 <- values(crownclosure2015_qc, mat = FALSE)[qc_ids] #ncell=1,512,617
vals_crownclosure2020 <- values(crownclosure2020_qc, mat = FALSE)[qc_ids] #ncell=1,512,617

# ---- Step 4: Obtain Balsam only crown closure (Québec 1-km)----
# Element-wise products (QC-only, aligned by qc_ids)
balsam_crown_2015 <- (vals_balsam2015 * vals_crownclosure2015)/100
balsam_crown_2020 <- (vals_balsam2015 * vals_crownclosure2020)/100

# Replace NAs(320 cells) by 0s
balsam_crown_2015[is.na(balsam_crown_2015)] <- 0
balsam_crown_2020[is.na(balsam_crown_2020)] <- 0

# ---- GOAL: Interpolate Balsam only crown closure (Québec 1-km) for the yrs 2016-19----

# Identify locations where 2015 > 2020
# Logical indicator (QC-only order)
idx_2015_gt_2020 <- balsam_crown_2015 > balsam_crown_2020
idx_2015_eq_2020 <- balsam_crown_2015 == balsam_crown_2020
idx_2015_lt_2020 <- balsam_crown_2015 < balsam_crown_2020


# How many QC cells satisfy this?
sum(idx_2015_gt_2020) #555594
sum(idx_2015_eq_2020) #205441
sum(idx_2015_lt_2020) #751582

print(sum(idx_2015_gt_2020)+
        sum(idx_2015_eq_2020)+
        sum(idx_2015_lt_2020)) #1,512,617

# Start with empty raster

# 1 = 2015 > 2020
# 2 = 2015 = 2020
# 3 = 2015 < 2020

cls_vec <- rep(NA_integer_, length(qc_ids))
cls_vec[idx_2015_gt_2020] <- 1L
cls_vec[idx_2015_eq_2020] <- 2L
cls_vec[idx_2015_lt_2020] <- 3L

cls_r <- qc_template
values(cls_r) <- NA
values(cls_r)[qc_ids] <- cls_vec

plot(
  cls_r,
  col = c("firebrick", "grey70", "steelblue"),
  main = "Balsam Crown Closure: 2015 vs 2020",
  axes = FALSE,
  legend = FALSE   # explicitly turn it off
)

legend(
  "topright",inset = 0.01,   # try 0.01–0.05
  legend = c("2015 > 2020", "2015 = 2020", "2015 < 2020"),
  fill = c("firebrick", "grey70", "steelblue"),
  bty = "n"
)




# assumes balsam_crown_2015 and balsam_crown_2020 are numeric vectors of same length
stopifnot(length(balsam_crown_2015) == length(balsam_crown_2020))

w <- (balsam_crown_2020 - balsam_crown_2015) / 5  # per-year change (2015->2020 is 5 years)

balsam_crown_2016 <- balsam_crown_2015 + 1 * w
balsam_crown_2017 <- balsam_crown_2015 + 2 * w
balsam_crown_2018 <- balsam_crown_2015 + 3 * w
balsam_crown_2019 <- balsam_crown_2015 + 4 * w


#save files
write_interp_tif <- function(vals, year, qc_template, qc_ids, out_dir) {
  r <- qc_template
  values(r) <- NA
  values(r)[qc_ids] <- vals
  writeRaster(r, file.path(out_dir, paste0("balsam_crown_", year, "_qc_1km.tif")), overwrite = TRUE)
}

out_dir_interp <- "D:/Interpolate_tree_sp/interp_balsam_crown_1km"
dir.create(out_dir_interp, showWarnings = FALSE, recursive = TRUE)

write_interp_tif(balsam_crown_2016, 2016, qc_template, qc_ids, out_dir_interp)
write_interp_tif(balsam_crown_2017, 2017, qc_template, qc_ids, out_dir_interp)
write_interp_tif(balsam_crown_2018, 2018, qc_template, qc_ids, out_dir_interp)
write_interp_tif(balsam_crown_2019, 2019, qc_template, qc_ids, out_dir_interp)

# Plot
make_year_raster <- function(vals, qc_template, qc_ids) {
  r <- qc_template
  values(r) <- NA
  values(r)[qc_ids] <- vals
  r
}

r_2015 <- make_year_raster(balsam_crown_2015, qc_template, qc_ids)
r_2016 <- make_year_raster(balsam_crown_2016, qc_template, qc_ids)
r_2017 <- make_year_raster(balsam_crown_2017, qc_template, qc_ids)
r_2018 <- make_year_raster(balsam_crown_2018, qc_template, qc_ids)
r_2019 <- make_year_raster(balsam_crown_2019, qc_template, qc_ids)
r_2020 <- make_year_raster(balsam_crown_2020, qc_template, qc_ids)


r_all <- c(r_2015, r_2016, r_2017, r_2018, r_2019, r_2020)
names(r_all) <- c("2015", "2016", "2017", "2018", "2019", "2020")

rng <- global(r_all, range, na.rm = TRUE)
zlim <- c(rng[1, "min"], rng[1, "max"])

par(mfrow = c(2, 3), mar = c(2, 2, 3, 4))

for (i in 1:nlyr(r_all)) {
  plot(
    r_all[[i]],
    col = hcl.colors(60, "YlGn"),
    colNA = "grey85",
    zlim =c(0, 100),
    main = names(r_all)[i],
    axes = FALSE
  )
}


































