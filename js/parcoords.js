<script id="brushing" type='text/javascript'>
						var color = d3.scale.category20(function(d){return d.State});
						var parcoords = d3.parcoords()("#example")
							.color('steelblue')
							.alpha(0.4);					
						var selected_data;

						// load csv file and create the chart
						d3.csv('./csv/state.csv', function(data) {
							selected_data = data.filter(function(row) {
								return row['Income ($)'] >= 50000 && row['Income ($)'] <= 51000;
							})
							
							parcoords
								.data(data)
								.render()
								.brushMode("1D-axes");  // enable brushing
			
							// create data table, row hover highlighting
							var grid = d3.divgrid();
							
							d3.select("#grid")
								.datum(selected_data.slice(0,20)) // make sure all the data points can be included in the chart
								.call(grid)
								.selectAll(".row")
								.on({
									"mouseover": function(d) { parcoords.highlight([d]); },
									"mouseout": parcoords.unhighlight
								});

							// update data table on brush event
							parcoords.on("brush", function(d) {
								d3.select("#grid")
									.datum(d.slice(0,20)) // make sure all the data points can be included in the chart
									.call(grid)
									.selectAll(".row")
									.on({
										"mouseover": function(d) { parcoords.highlight([d]); },
										"mouseout": parcoords.unhighlight
									});
							});
						});
					</script>