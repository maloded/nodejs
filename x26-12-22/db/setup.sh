psql -f install.sql -U postgres
PGPASSWORD=marcus psql -d example -f structure.sql -U ded
PGPASSWORD=marcus psql -d example -f data.sql -U ded
