### Deploy Meteor App - Dokku + DigitalOcean

- create a `512mb` droplet with one click Dokku 0.4.1
- point a `A` DNS Record to your droplet's IP
- got to tour droplet's IP on browser, and configure dokku

- ssh into your droplet:
```
# add dokku user
cat /root/.ssh/authorized_keys | sshcommand acl-add dokku dokku

# create swap file
sudo fallocate -l 2048m /mnt/swap_file.swap && sudo chmod 600 /mnt/swap_file.swap && sudo mkswap /mnt/swap_file.swap && sudo swapon /mnt/swap_file.swap && echo "/mnt/swap_file.swap none swap sw 0 0" >> /etc/fstab

# update local settings
sh -c "echo 'LANG=en_US.UTF-8\nLC_ALL=en_US.UTF-8' > /etc/default/locale
reboot

# create dokku app
dokku apps:create met_deploy
dokku config:set met_deploy ROOT_URL=http://www.your-url.com

# install and config mongodb
dokku plugin:install https://github.com/dokku/dokku-mongo.git mongo
dokku mongo:create met_deploy_db
dokku mongo:link met_deploy_db met_deploy
```

- add a `.buildpacks` file with `https://github.com/AdmitHub/meteor-buildpack-horse.git`
- send to github and to remote dokku
```
# cd into your repo
git add .
git commit -m "add .buildpacks file"
git push

# set remote git
git remote add dokku dokku@droplet_ip:met_deploy
git push dokku master

```