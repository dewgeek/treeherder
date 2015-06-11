from treeherder.etl import buildapi
from pympler import tracker
import time

tr = tracker.SummaryTracker()
tr.print_diff()
tr.print_diff()
tr.print_diff()
tr.print_diff()

print "-- done clearing print_diff --"
print ""

for j in range(0, 50):
    print ""
    print "<><><><><><><><><><><><><>"
    print time.ctime()
    print "Pass {}".format(j)
    buildapi.Builds4hJobsProcess().run()
    tr.print_diff()
    time.sleep(60)

