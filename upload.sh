tar czvf build.tar.gz static templates app.py database.py main.py process.py requirements.txt
scp -i ~/secretKeys/reflexml.pem build.tar.gz ubuntu@18.222.188.14:/home/ubuntu
ssh -i ~/secretKeys/reflexml.pem ubuntu@18.222.188.14 -t tmux a